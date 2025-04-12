package com.hexa.assetmanagement.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hexa.assetmanagement.service.MyService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private MyService myService;
	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
	 
		 //cross site reference forgery to run post we have to disable this
				.csrf(csrf ->csrf.disable())
				.authorizeHttpRequests((authorize) -> authorize
				.requestMatchers("/api/user/token/generate").permitAll()
				.requestMatchers("/api/user/user/details").authenticated()
				.requestMatchers("/api/asset/public/hello").permitAll()
				.requestMatchers("/api/asset/private/hello").authenticated()
				.requestMatchers("/api/user/signup").permitAll()
				.requestMatchers("/api/user/reset").authenticated()
				.requestMatchers("/api/user/login").authenticated()
				.requestMatchers("/api/assetallocation/add/{assetId}/{empId}").hasAuthority("ADMIN")
				.requestMatchers("/api/assetallocation/delete-assetid/{assetId}").hasAuthority("ADMIN")
				.requestMatchers("/api/assetallocation/get/{assetAllocationId}").authenticated()
				.requestMatchers("/api/assetallocation/getall").authenticated()
				.requestMatchers("/api/servicerequest/add/{assetId}").hasAuthority("EMPLOYEE")
				.requestMatchers("/api/servicerequest/getbyid/{RequestId}").authenticated()
				.requestMatchers("/api/servicerequest/getall").authenticated()
				.requestMatchers("/api/servicerequest/bystatus").authenticated()
				.requestMatchers("/api/servicerequest/byEmployeeId").authenticated()
				.requestMatchers("/api/servicerequest/byAssetId").authenticated()
				.requestMatchers("/api/category/add").hasAuthority("ADMIN")
				.requestMatchers("/api/category/getbyid/{CategoryId}").permitAll()
				.requestMatchers("/api/category/getall").permitAll()
				.requestMatchers("/api/liquidasset/add").hasAuthority("MANAGER")
				.requestMatchers("/api/liquidasset/getall").permitAll()
				.requestMatchers("/api/liquidasset/get/{id}").permitAll()
				.requestMatchers("/api/liquidasset/bystatus").permitAll()
				.requestMatchers("/api/liquidasset/byname").permitAll()
				.requestMatchers("/api/liquidasset/bystatus").permitAll()
				.requestMatchers("/api/liquidassetreq/add/{employeeId}/{liquidAssetId}").hasAuthority("EMPLOYEE")
				.requestMatchers("/api/liquidassetreq/getbyid/{id}").permitAll()
				.requestMatchers("/api/liquidassetreq/getall").permitAll()
				.requestMatchers("api/liquidassetallocation/add/{employeeId}/{liquidAssetId}").hasAuthority("MANAGER")
				.requestMatchers("/api/liquidassetallocation/getbyid/{id}").permitAll()
				.requestMatchers("/api/liquidassetallocation/getall").permitAll()
                .requestMatchers("/api/asset/add/{categoryId}").hasAuthority("ADMIN")
                .requestMatchers("/api/asset/getbyid/{assetId}").permitAll()
				.requestMatchers("/api/asset/getall").permitAll()
				.requestMatchers("/api/asset/getbyname").permitAll()
				.requestMatchers("/api/asset/getbycategory").permitAll()
				.requestMatchers("/api/asset/getbystatus").permitAll() 
	            .requestMatchers("/api/asset/update-asset/{assetId}").hasAuthority("ADMIN")  
	            .requestMatchers("/api/asset/delete/{assetId}").hasAuthority("ADMIN")  
				.requestMatchers("/api/admin/add").authenticated()
	            .requestMatchers("/api/admin/getall").hasAnyAuthority("ADMIN","MANAGER")
	            .requestMatchers("/api/admin/getbyid/{AdminId}").hasAnyAuthority("ADMIN","MANAGER")
	            .requestMatchers("/api/admin/update/{AdminId}").hasAnyAuthority("ADMIN","MANAGER")

	             .requestMatchers("/api/employee/add-by-employee/{departmentId}").hasAuthority("EMPLOYEE")
	            .requestMatchers("/api/employee/add/{departmentId}").hasAnyAuthority("ADMIN","EMPLOYEE")
	            .requestMatchers("/api/employee/getbyid/{empId}").permitAll()
	            .requestMatchers("/api/employee/getall").hasAnyAuthority("ADMIN", "MANAGER")
	            .requestMatchers("/api/employee/getbyname").permitAll()
	            .requestMatchers("/api/employee/getbydepartment").permitAll()
	            .requestMatchers("/api/employee/update/{empId}").hasAuthority("ADMIN")
	            .requestMatchers("/api/employee/delete/{empId}").hasAuthority("ADMIN")  
	            .requestMatchers("/api/assetrequest/add/{assetId}").hasAuthority("EMPLOYEE")  
	            .requestMatchers("/api/assetrequest/get/{assetRequestId}").permitAll() 
	            .requestMatchers("/api/assetrequest/getall").permitAll() 
	            .requestMatchers("/api/assetrequest/getbystatus").permitAll() 
	            .requestMatchers("/api/assetrequest/getbyempid/{empId}").permitAll() 
	            .requestMatchers("/api/assetrequest/getbyassetid/{assetId}").permitAll() 
	            .requestMatchers("/api/assetrequest/getbydate").permitAll() 
	            .requestMatchers("/api/assetrequest/update-status/{assetRequestId}").hasAuthority("ADMIN") 
	            .requestMatchers("/api/assetrequest/delete-by-asset/{assetId}").hasAuthority("ADMIN")
	            .requestMatchers("/api/assetrequest/delete-by-employee/{empId}").hasAuthority("ADMIN")
				.requestMatchers("/api/assetallocation/delete-empId/{empId}").hasAuthority("ADMIN")
				.requestMatchers("/api/assetallocation/update/{allocationId}").hasAnyAuthority("ADMIN","EMPLOYEE")
				.requestMatchers("/api/assetallocation/byAssetId").authenticated()
				.requestMatchers("/api/assetallocation/byEmpId").authenticated()
				.requestMatchers("/api/servicerequest/delete-assetid/{assetId}").hasAuthority("ADMIN")
				.requestMatchers("/api/servicerequest/delete-empId/{empId}").hasAuthority("ADMIN")
				.requestMatchers("/api/servicerequest/update/{requestId}").hasAuthority("ADMIN")
				.requestMatchers("/api/servicerequest/image/upload/{requestId}").hasAuthority("EMPLOYEE")
				

				.anyRequest().authenticated()
			)
			.sessionManagement(session->session
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	AuthenticationProvider myAuth() {
		DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
		dao.setPasswordEncoder(encodePass());
		dao.setUserDetailsService(myService);
		return dao;
	}

	@Bean
	BCryptPasswordEncoder encodePass() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	AuthenticationManager getAuthentication(AuthenticationConfiguration auth) throws Exception {
		return auth.getAuthenticationManager();
	}
}