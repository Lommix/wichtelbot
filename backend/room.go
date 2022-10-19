package backend

type Room struct {
	name             string
	clients          map[*Client]bool
	clientReadyState map[*Client]bool
	broadcast        chan []byte
	register         chan *Client
	unregister       chan *Client
	ready            chan *Client
	unready          chan *Client
}

func newRoom(name string) *Room {
	return &Room{
		name:             name,
		clients:          make(map[*Client]bool),
		clientReadyState: make(map[*Client]bool),
		broadcast:        make(chan []byte),
		register:         make(chan *Client),
		unregister:       make(chan *Client),
		ready:            make(chan *Client),
		unready:          make(chan *Client),
	}
}

func (r *Room) run() {
	for {
		select {
		case client := <-r.register:
			r.clients[client] = true
			r.clientReadyState[client] = false
		case client := <-r.unregister:
			if _, ok := r.clients[client]; ok {
				delete(r.clients, client)
				delete(r.clientReadyState, client)
				close(client.send)
			}
		case client := <-r.ready:
			r.clientReadyState[client] = true
			if r.isReadyAll() {
				r.play()
			}
		case client := <-r.unready:
			r.clientReadyState[client] = false
			// case message := <-r.broadcast:
			// 	for client := range r.clients {
			// 		select {
			// 		case client.send <- string(message):
			// 		default:
			// 			close(client.send)
			// 			delete(r.clientReadyState, client)
			// 			delete(r.clients, client)
			// 		}
			// 	}
		}
	}
}

func (r *Room) play() {
	println("lol you just played")
	for client := range r.clientReadyState {
		r.clientReadyState[client] = false
	}
}

func (r *Room) isReadyAll() bool {
	for _, state := range r.clients {
		if !state {
			return false
		}
	}
	return true
}
