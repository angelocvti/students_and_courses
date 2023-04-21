package com.angelocvti.controller;

import com.angelocvti.service.Producer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class Controller {
    private final Producer producer;

    public Controller(Producer producer) {
        this.producer = producer;
    }

    @PostMapping("/add-student")
    public ResponseEntity<Void> saveStudent(@RequestBody String message) {
        producer.sendStudent(message.getBytes());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-course")
    public ResponseEntity<Void> saveCourse(@RequestBody String message) {
        producer.sendCourse(message.getBytes());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-enrollment")
    public ResponseEntity<Void> saveEnrollment(@RequestBody String message) {
        producer.sendEnrollment(message.getBytes());
        return ResponseEntity.ok().build();
    }
}