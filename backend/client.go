package backend

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type comPackage struct {
	Action string
	Args  string
}

type Client struct {
	id   string
	conn *websocket.Conn
	send chan comPackage
}

func (c *Client) runWrite() {
	c.conn.SetReadLimit(1024)
	for {
		if msg, ok := <-c.send; ok {
			// message := bytes.TrimSpace(bytes.Replace(msg, newline, space, -1))
			c.conn.WriteJSON(msg)
		}
	}
}

func (c *Client) runRead() {
	for {
		var com comPackage
		err := c.conn.ReadJSON(&com)
		if err != nil {
			break
		}
		fmt.Println(com)
		c.send <- com
	}
}

func SpawnClient(id string, ctx *gin.Context) *Client {
	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)

	if err != nil {
		log.Println(err)
	}

	client := &Client{id: id, conn: conn, send: make(chan comPackage, 256)}

	go client.runRead()
	go client.runWrite()

	//setup send and recieve

	return client
}
