var stompClient = null;

function connect() {
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);
    stompClient.connect( {}, function(frame) {
        $("#chat-room").removeClass("d-none");
        $("#name-form").addClass("d-none");

        //subscribe
        stompClient.subscribe("/topic/return-to", function(response){
            showMessage(JSON.parse(response.body));
        });
    });
}

function showMessage(message){
    $("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`);
}

function sendMessage(){
    let jsonOb = {
        name: localStorage.getItem("name"),
        content: $("#message-value").val()
    };
    stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
    $("#message-value").val("");
    $("#message-value").focus();
}

$(document).ready((e) => {
    $("#name-value").val("");
    $("#login").click(() => {
        let name = $("#name-value").val();
        if(name){
            localStorage.setItem("name", name);
            $("#name-title").html(`Welcome, <b>${name}</br>`);
            $("#name-value").val("");
            $("#message-value").focus();
            connect();
        }
    });

    $("#send").click(() => {
        sendMessage();
    });

    $("#logout").click(() => {
        localStorage.removeItem("name");
        if(stompClient != null){
            stompClient.disconnect();
            $("#chat-room").addClass("d-none");
            $("#name-form").removeClass("d-none");
        }
        $("#message-container-table").html("");
    });
});

$(document).on('keypress', function(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
        if($("#chat-room").is(":visible") && $("#message-value").val()){
            sendMessage();
        }
        if($("#name-form").is(":visible") && $("#name-value").val()){
            let name = $("#name-value").val();
            localStorage.setItem("name", name);
            $("#name-title").html(`Welcome, <b>${name}</br>`);
            $("#name-value").val("");
            connect();
        }
    }
});