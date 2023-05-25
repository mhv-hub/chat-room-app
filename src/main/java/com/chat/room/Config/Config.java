package com.chat.room.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class Config implements WebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		//This url will be used to connect to the server
		registry.addEndpoint("/server1").withSockJS();
	}
	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		//This url will be used to subscribe so that message will be brodcasted to the subscriber
		registry.enableSimpleBroker("/topic");
		//This url will be used to send message from client
		registry.setApplicationDestinationPrefixes("/app");
	}
}
