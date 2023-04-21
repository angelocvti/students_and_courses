package com.angelocvti.service;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class Producer {
    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;
    @Value("${rabbitmq.routing.students.key}")
    private String routingStudentsKey;
    @Value("${rabbitmq.routing.courses.key}")
    private String routingCoursesKey;
    @Value("${rabbitmq.routing.enrollments.key}")
    private String routingEnrollmentKey;

    private final RabbitTemplate rabbitTemplate;

    public Producer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendStudent(final byte[] messageBytes) {
        Message message = MessageBuilder.withBody(messageBytes).build();
        rabbitTemplate.send(exchangeName, routingStudentsKey, message);
        System.out.println(new String(messageBytes) + " sent to: " + exchangeName + ",  " + routingStudentsKey);
    }

    public void sendCourse(byte[] messageBytes) {
        Message message = MessageBuilder.withBody(messageBytes).build();
        rabbitTemplate.send(exchangeName, routingCoursesKey, message);
        System.out.println("Message sent to: " + exchangeName + ",  " + routingCoursesKey);
    }

    public void sendEnrollment(byte[] messageBytes) {
        Message message = MessageBuilder.withBody(messageBytes).build();
        rabbitTemplate.send(exchangeName, routingEnrollmentKey, message);
        System.out.println("Message sent to: " + exchangeName + ",  " + routingEnrollmentKey);
    }
}