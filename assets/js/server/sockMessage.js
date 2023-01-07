var server;
var channel;

var sockJs;
var stompClient;

function init() {
    connect();
}
const header = {
    "Authorization" : "test"
};

const connect = function () {

    sockJs = new SockJS("http://localhost:8080/ws");

    stompClient = Stomp.over(sockJs);

    stompClient.connect(header, function (frame) {

        stompClient.subscribe('/message/user', function (response) {
            console.log(response);
        })
    });
};

function socketConfigurer(socketServerAddress, personalChannel) {

    server = socketServerAddress
    channel = personalChannel;
    init();
}

function getMessage(container) {
    stompClient.onmessage = function (event) {

    }
}
connect();
export {
    socketConfigurer,
    getMessage
}