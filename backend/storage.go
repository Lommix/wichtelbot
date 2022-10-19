package backend

import "github.com/gorilla/sessions"

var key = []byte("superduperultrasecret")
var Store *sessions.CookieStore = sessions.NewCookieStore(key)

var Clients []Client
var Rooms []Room
