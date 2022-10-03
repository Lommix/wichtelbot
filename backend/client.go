package backend

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type comPackage struct {
	Message string
	Action  string
}

type Client struct {
	id   string
	conn *websocket.Conn
	send chan *[]byte
}

func (c *Client) initWriteObserver() {
	defer func() {
		//cleanup
	}()
	c.conn.SetReadLimit(1024)
	for {
		if _, ok := <-c.send; ok {
			c.conn.WriteJSON("hello world")
		}
	}
}

func (c *Client) initReadObserver() {
	defer func() {
		//cleanup
	}()
	for {
		_, msg, err := c.conn.ReadMessage()

		if err != nil {
			break
		}
		c.send <- &msg
	}
}

func SpawnClient(id string, ctx *gin.Context) *Client {
	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)

	if err != nil {
		log.Println(err)
	}

	client := &Client{id: id, conn: conn, send: make(chan *[]byte, 256)}

	go client.initReadObserver()
	go client.initWriteObserver()

	//setup send and recieve

	return client
}
