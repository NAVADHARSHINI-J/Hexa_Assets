package com.hexa.assetmanagement.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.hexa.assetmanagement.service.MyService;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private MyService myService;
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		 //cross site reference forgery to run post we have to disable this
				.csrf(csrf ->csrf.disable())
				.authorizeHttpRequests((authorize) -> authorize
				.requestMatchers("/api/asset/public/hello").permitAll()
				.requestMatchers("/api/asset/private/hello").authenticated()
				.requestMatchers("/api/user/signup").permitAll()
				.requestMatchers("/api/user/login").authenticated()
				.anyRequest().authenticated()
			)
			.authenticationProvider(myAuth())
			.httpBasic(Customizer.withDefaults());
		return http.build();
	}

	@Bean
	AuthenticationProvider myAuth() {
		DaoAuthenticationProvider dao=new DaoAuthenticationProvider();
		dao.setPasswordEncoder(encodePass());
		dao.setUserDetailsService(myService);
		return dao ;
	}
	@Bean
	BCryptPasswordEncoder encodePass(){
		return new BCryptPasswordEncoder();
	}
}