package com.angelocvti.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
    @Value("${rabbitmq.queue.students.name}")
    private String studentsQueueName;
    @Value("${rabbitmq.queue.courses.name}")
    private String coursesQueueName;
    @Value("${rabbitmq.queue.enrollments.name}")
    private String enrollmentsQueueName;
    @Value("${rabbitmq.routing.students.key}")
    private String routingStudentsKey;
    @Value("${rabbitmq.routing.courses.key}")
    private String routingCoursesKey;
    @Value("${rabbitmq.routing.enrollments.key}")
    private String routingEnrollmentsKey;
    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Bean
    public Queue studentsQueue() {
        return new Queue(studentsQueueName);
    }

    @Bean
    public Queue coursesQueue() {
        return new Queue(coursesQueueName);
    }

    @Bean
    public Queue enrollmentsQueue() {
        return new Queue(enrollmentsQueueName);
    }

    @Bean
    public Binding studentsBinding() {
        return BindingBuilder
                .bind(studentsQueue())
                .to(exchange())
                .with(routingStudentsKey);
    }

    @Bean
    public Binding coursesBinding() {
        return BindingBuilder
                .bind(coursesQueue())
                .to(exchange())
                .with(routingCoursesKey);
    }

    @Bean
    public Binding enrollmentsBinding() {
        return BindingBuilder
                .bind(enrollmentsQueue())
                .to(exchange())
                .with(routingCoursesKey);
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(exchangeName);
    }
}