package storage

import (
	"encoding/gob"
	"encoding/json"
	"errors"
	"io/ioutil"

	"github.com/gorilla/sessions"
)

type User struct {
	Id       string
	Name     string
	Password string
	Tags     []string
	Notice   string
	Partner  string
}

var Key = []byte("superduperultrasecret")
var Store *sessions.CookieStore = sessions.NewCookieStore(Key)
var Users []User

const COOKIE_NAME = "session"

func init() {
	gob.Register(&User{})
}


// validate a user, retuns success
func Verify(name string, password string) (*User, error) {
	
	user,err := Get(name)
	if err != nil {
		return nil, err
	}

	if user.Password == password {
		return user, nil
	}

	return nil, errors.New("Falsches Passwort")
}


// gets user if exists
func Get(name string) (*User, error) {
	for _, user := range Users {
		if user.Name == name {
			return &user, nil
		}
	}
	return nil, errors.New("Nutzer existiert nicht")
}

// Checks if username is registered 
func Has(name string) bool {
	for _, user := range Users {
		if user.Name == name {
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
	err = ioutil.WriteFile("data.json", output, 0644)
	if err != nil {
		return err
	}
	return nil
}

// load file to memory
func Load() error {
	data, err := ioutil.ReadFile("data.json")
	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &Users)
	if err != nil {
		return err
	}
	return nil
}
