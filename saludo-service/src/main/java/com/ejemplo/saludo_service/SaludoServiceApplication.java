package com.ejemplo.saludo_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController // Convertimos esta clase en un controlador
public class SaludoServiceApplication {

	// Controlador para manejar la solicitud GET en /saludo con un parámetro "nombre"
	@GetMapping("/saludo")
	public String getMessage(@RequestParam(value = "nombre", defaultValue = "¡Bienvenido a nuestro servicio!") String nombre) {
		return "Hola, " + nombre + "!";
	}

	public static void main(String[] args) {
		SpringApplication.run(SaludoServiceApplication.class, args);
	}
}
