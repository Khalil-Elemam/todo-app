package com.killuacode.Todoapi;


import com.killuacode.Todoapi.security.JwtService;
import com.killuacode.Todoapi.todo.Todo;
import com.killuacode.Todoapi.todo.TodoRepository;
import com.killuacode.Todoapi.user.User;
import com.killuacode.Todoapi.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
@EnableAsync
public class Application {

	Logger logger = LoggerFactory.getLogger(getClass());

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}


	@Bean
	public WebMvcConfigurer webMvcConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry
						.addMapping("/**")
						.allowedOrigins("http://localhost:5173");
			}
		};
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			UserRepository userRepository,
			JwtService jwtService,
			PasswordEncoder passwordEncoder,
			TodoRepository todoRepository
	) {
		return args -> {

			var user = User
					.builder()
					.email("khalil2020100@gmail.com")
					.firstName("Khalil")
					.lastName("Elemam")
					.password(passwordEncoder.encode("Admin$100100"))
					.enabled(true)
					.build();
			userRepository.save(user);
			var todos = List.of(
					Todo.builder().content("This is the first Todo").user(user).targetDate(LocalDate.now().plusDays(4)).build(),
					Todo.builder().content("This is the Second Todo").user(user).targetDate(LocalDate.now().plusDays(20)).build()

			);
			String token = jwtService.generateAccessToken(user);
			logger.info("User Token is {}", token);
			todoRepository.saveAll(todos);
		};
	}

}
