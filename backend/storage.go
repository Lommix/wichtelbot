package backend

import "github.com/gorilla/sessions"

var Cookies *sessions.CookieStore
var Clients []Client



func init() {
	Cookies = sessions.NewCookieStore([]byte("session"))
}
