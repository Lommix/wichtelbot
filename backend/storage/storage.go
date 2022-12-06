package storage

import (
	"encoding/base64"
	"encoding/gob"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/gorilla/sessions"
)

type User struct {
	Id       string
	Name     string
	Password string
	Tags     []string
	Notice   string
	Partner  Partner
}

type Partner struct {
	Name   string
	Tags   []string
	Notice string
}

var Key = []byte("superduperultrasecret")
var Store *sessions.CookieStore = sessions.NewCookieStore(Key)
var Users []User
var StorageQueue = make(chan User, 100)

const COOKIE_NAME = "session"

func init() {
	gob.Register(&Partner{})
	gob.Register(&User{})
}

func StorageWorker() {
	for {
		user := <-StorageQueue
		fmt.Println(user)
		if Has(user.Id) {
			for i := range Users {
				if Users[i].Id == user.Id {
					fmt.Println("updating user")
					Users[i].Tags = user.Tags
					Users[i].Notice = user.Notice
					Users[i].Partner = user.Partner
					Save()
				}
			}
		} else {
			fmt.Println("saving user")
			Users = append(Users, user)
			Save()
		}
	}
}

// validate a user, retuns success
func Verify(name string, password string) (*User, error) {

	user, err := GetByName(name)
	if err != nil {
		return nil, err
	}

	if user.Password == password {
		return user, nil
	}

	return nil, errors.New("Falsches Passwort")
}

// get partner by user id
func GetPartner(id string) (Partner, error) {
	for _, user := range Users {
		if user.Id == id {
			return Partner{
				Name:   user.Name,
				Notice: user.Notice,
				Tags:   user.Tags,
			}, nil
		}
	}
	return Partner{}, errors.New("partner not found")
}

// gets user by name if exists
func GetByName(name string) (*User, error) {
	for _, user := range Users {
		if user.Name == name {
			return &user, nil
		}
	}
	return nil, errors.New("Nutzer existiert nicht")
}

// gets user by name if exists
func GetById(id string) (*User, error) {
	for _, user := range Users {
		if user.Id == id {
			return &user, nil
		}
	}
	return nil, errors.New("Nutzer existiert nicht")
}

func Udate(user *User) {
	for i := range Users {
		if Users[i].Id == user.Id {
			Users[i].Tags = user.Tags
			Users[i].Notice = user.Notice
			Save()
		}
	}

}

// Checks if username is registered
func Has(id string) bool {
	for _, user := range Users {
		if user.Id == id {
			return true
		}
	}
	return false
}

// write mem to file
func Save() error {
	output, err := json.MarshalIndent(Users, "", " ")
	if err != nil {
		return err
	}

	encoded := string(base64.StdEncoding.EncodeToString([]byte( output)))
	err = ioutil.WriteFile("supercoolminidb.420", []byte(encoded), 0644)
	if err != nil {
		return err
	}
	return nil
}

// load file to memory
func Load() error {

	go StorageWorker()

	_, err := os.Stat("supercoolminidb.420")
	if err != nil {
		return nil
	}

	data, err := ioutil.ReadFile("supercoolminidb.420")
	if err != nil {
		return err
	}

	decoded, err := base64.StdEncoding.DecodeString(string(data))
	if err != nil {
		return err
	}

	// err = json.Unmarshal(data, &Users)
	err = json.Unmarshal(decoded, &Users)
	if err != nil {
		return err
	}

	return nil
}
