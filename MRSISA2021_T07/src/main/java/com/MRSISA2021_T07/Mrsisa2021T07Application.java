package com.MRSISA2021_T07;

import java.util.HashMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.services.DermatologistService;


@SpringBootApplication(scanBasePackages = {"com.MRSISA2021_T07"})
@RestController
//@ComponentScan(basePackageClasses = DermatologistService.class)
public class Mrsisa2021T07Application {
	
	public static void main(String[] args) {
		SpringApplication.run(Mrsisa2021T07Application.class, args);
		
		}
		@GetMapping("/hello")
		public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
		
	}
}