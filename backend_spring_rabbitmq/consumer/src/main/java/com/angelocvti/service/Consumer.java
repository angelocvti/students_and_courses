package com.angelocvti.service;

import com.angelocvti.dto.CourseMessage;
import com.angelocvti.dto.EnrollmentMessage;
import com.angelocvti.dto.StudentMessage;
import com.google.gson.Gson;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "${rabbitmq.queue.students.name}"),
            exchange = @Exchange(value = "${rabbitmq.exchange.name}", type = ExchangeTypes.TOPIC),
            key = "${rabbitmq.routing.students.key}"))
    public void consumeStudent(final Message message) {
        byte[] body = message.getBody();

        StudentMessage studentMessage = new Gson().fromJson(new String(body), StudentMessage.class);

        System.out.println("Message content: " + studentMessage);
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "${rabbitmq.queue.courses.name}"),
            exchange = @Exchange(value = "${rabbitmq.exchange.name}", type = ExchangeTypes.TOPIC),
            key = "${rabbitmq.routing.courses.key}"))
    public void consumeCouse(final Message message) {
        byte[] body = message.getBody();

        CourseMessage courseMessage = new Gson().fromJson(new String(body), CourseMessage.class);

        System.out.println("Message content: " + new String(body));
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "${rabbitmq.queue.enrollments.name}"),
            exchange = @Exchange(value = "${rabbitmq.exchange.name}", type = ExchangeTypes.TOPIC),
            key = "${rabbitmq.routing.enrollments.key}"))
    public void consumeEnrollment(final Message message) {
        byte[] body = message.getBody();

        EnrollmentMessage enrollmentMessage = new Gson().fromJson(new String(body), EnrollmentMessage.class);

        System.out.println("Message content: " + new String(body));
    }
}