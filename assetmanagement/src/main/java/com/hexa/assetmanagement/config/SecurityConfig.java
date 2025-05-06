package com.hexa.assetmanagement.config;

 
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
		        .cors(withDefaults())
		 //cross site reference forgery to run post we have to disable this
				.cors(withDefaults())
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
				.requestMatchers("/api/category/getbyid/{CategoryId}").authenticated()
				.requestMatchers("/api/category/getall").authenticated()
				.requestMatchers("/api/liquidasset/add").hasAuthority("MANAGER")

				.requestMatchers("/api/liquidasset/getall").authenticated()
				.requestMatchers("/api/liquidasset/get/{id}").authenticated()
				.requestMatchers("/api/liquidasset/bystatus/{status}").authenticated()
				.requestMatchers("/api/liquidasset/byname").authenticated()

				.requestMatchers("/api/liquidasset/update/{liquidAssetId}").hasAuthority("MANAGER")
				.requestMatchers("/api/liquidasset/delete/{liquidAssetId}").hasAuthority("MANAGER")
				.requestMatchers("/api/liquidassetreq/add/{employeeId}/{liquidAssetId}").hasAuthority("EMPLOYEE")
				.requestMatchers("/api/liquidassetreq/getbyid/{id}").authenticated()
				.requestMatchers("/api/liquidassetreq/getall").authenticated()
				.requestMatchers("/api/liquidassetreq/bystatus").authenticated()
				.requestMatchers("/api/liquidassetreq/byliquidAssetId/{id}").authenticated()
				.requestMatchers("/api/liquidassetreq/byemployeeId/{id}").authenticated()

				.requestMatchers("/api/liquidassetreq/bydate/{date}").authenticated()
				.requestMatchers("/api/liquidassetreq/countbystatus/{status}").authenticated()
				.requestMatchers("/api/liquidassetreq/delete/byliquidasset/{id}").hasAuthority("MANAGER")
				.requestMatchers("/api/liquidassetreq/delete/byemployee/{id}").hasAuthority("MANAGER")
				.requestMatchers("api/liquidassetallocation/add/{employeeId}/{liquidAssetId}").hasAuthority("MANAGER")
				.requestMatchers("/api/liquidassetallocation/getbyid/{id}").authenticated()
				.requestMatchers("/api/liquidassetallocation/getall").hasAuthority("MANAGER")

				.requestMatchers("/api/liquidassetallocation/employee/{employeeId}").authenticated()
				.requestMatchers("/api/liquidassetallocation/liquidAsset/{liquidAssetId}/employees").authenticated()
				.requestMatchers("/api/liquidassetallocation//delete/by-liquid-asset/{id}").hasAuthority("MANAGER")
				.requestMatchers("/api/liquidassetallocation/delete/by-employee/{id}").hasAuthority("MANAGER")
                .requestMatchers("/api/asset/add/{categoryId}").hasAuthority("ADMIN")
                .requestMatchers("/api/asset/getbyid/{assetId}").authenticated()
				.requestMatchers("/api/asset/getall").authenticated()
				.requestMatchers("/api/asset/getbyname").authenticated()
				.requestMatchers("/api/asset/getbycategory").authenticated()
				.requestMatchers("/api/asset/getbystatus").authenticated()
	            .requestMatchers("/api/asset/update-asset/{assetId}").hasAuthority("ADMIN")  
	            .requestMatchers("/api/asset/delete/{assetId}").hasAuthority("ADMIN")  
				.requestMatchers("/api/admin/add").authenticated()
	            .requestMatchers("/api/admin/getall").hasAnyAuthority("ADMIN","MANAGER")
	            .requestMatchers("/api/admin/getbyid/{AdminId}").hasAnyAuthority("ADMIN","MANAGER")
	            .requestMatchers("/api/admin/update/{AdminId}").hasAnyAuthority("ADMIN","MANAGER")
	            .requestMatchers("/api/employee/add-employee/{departmentId}").permitAll() 
	            .requestMatchers("/api/employee/getbyid/{empId}").authenticated()
	            .requestMatchers("/api/employee/getall").hasAnyAuthority("ADMIN", "MANAGER")
 
	            .requestMatchers("/api/employee/getbyname").authenticated()
	            .requestMatchers("/api/employee/getbydepartment").authenticated()
	            .requestMatchers("/api/employee/getbyuser/{userId}").authenticated()
 
	            .requestMatchers("/api/asset/update-asset/{id}").hasAuthority("ADMIN")
	            .requestMatchers("/api/manager/add").hasAnyAuthority("ADMIN","MANAGER")
	            .requestMatchers("/api/manager/getall").hasAnyAuthority("ADMIN","MANAGER")
	            .requestMatchers("/api/manager/getbyid/{ManagerId}").hasAnyAuthority("ADMIN","MANAGER")
	            .requestMatchers("/api/manager/update/{ManagerId}").hasAnyAuthority("ADMIN","MANAGER")
 
	            .requestMatchers("/api/employee/update/{empId}").hasAnyAuthority("ADMIN", "EMPLOYEE")
	            .requestMatchers("/api/employee/delete/{empId}").hasAuthority("ADMIN")  
	            .requestMatchers("/api/assetrequest/add/{assetId}").hasAuthority("EMPLOYEE")  
	            .requestMatchers("/api/assetrequest/get/{assetRequestId}").authenticated()
	            .requestMatchers("/api/assetrequest/getall").authenticated() 
	            .requestMatchers("/api/assetrequest/getbystatus").authenticated()
	            .requestMatchers("/api/assetrequest/getbyempid/{empId}").authenticated()
	            .requestMatchers("/api/assetrequest/getbyassetid/{assetId}").authenticated() 
	            .requestMatchers("/api/assetrequest/getbydate").authenticated()
	            .requestMatchers("/api/assetrequest/update-status/{assetRequestId}").hasAuthority("ADMIN") 
	            .requestMatchers("/api/assetrequest/delete-by-asset/{assetId}").hasAuthority("ADMIN")
	            .requestMatchers("/api/assetrequest/delete-by-employee/{empId}").hasAuthority("ADMIN")
 
	            .requestMatchers("/api/department/add").authenticated()
	            .requestMatchers("/api/department/getbyid/{departmentId}").authenticated()
	            .requestMatchers("/api/department/getall").permitAll()
 
				.requestMatchers("/api/assetallocation/delete-empId/{empId}").hasAuthority("ADMIN")
				.requestMatchers("/api/assetallocation/update/{allocationId}").hasAnyAuthority("ADMIN","EMPLOYEE")
				.requestMatchers("/api/assetallocation/byAssetId").authenticated()
				.requestMatchers("/api/assetallocation/byEmpId").authenticated()
				.requestMatchers("/api/servicerequest/delete-assetid/{assetId}").hasAuthority("ADMIN")
				.requestMatchers("/api/servicerequest/delete-empId/{empId}").hasAuthority("ADMIN")
				.requestMatchers("/api/servicerequest/update/{requestId}").hasAuthority("ADMIN")
				.requestMatchers("/api/servicerequest/image/upload/{requestId}").hasAuthority("EMPLOYEE")
 

				.requestMatchers("/swagger-ui/**").permitAll()
				.anyRequest().permitAll()
			)
			//no session will be stored on the server when we give stateless
			.sessionManagement(session->session
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			//please place the jwtfilter before usernamepassword authentication filter 
			.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedOrigins(List.of("http://localhost:5173"));
	    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    configuration.setAllowedHeaders(List.of("*"));
	    configuration.setAllowCredentials(true);
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
	}


	
	@Bean
	UrlBasedCorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);
 	  //  configuration.setExposedHeaders(List.of("Authorization"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	@Bean
	AuthenticationProvider myAuth() {
		DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
		dao.setPasswordEncoder(encodePass());
		dao.setUserDetailsService(myService);
		return dao;
	}
	
	@Bean
 	UrlBasedCorsConfigurationSource corsConfigurationSource() {
 	    CorsConfiguration configuration = new CorsConfiguration();
 	    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
 	    configuration.setAllowedHeaders(List.of("*"));
 	    configuration.setAllowCredentials(true);
 	    configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
 	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
 	    source.registerCorsConfiguration("/**", configuration);
 	    return source;
 	}

	/*this bean is needed to encode the password*/
	@Bean
	BCryptPasswordEncoder encodePass() {
		return new BCryptPasswordEncoder();
	}
	
	/*we created a bean of authentication manager because we want it to authenticate the credentails
	 * in token generate*/
	@Bean
	AuthenticationManager getAuthentication(AuthenticationConfiguration auth) throws Exception {
		return auth.getAuthenticationManager();
	}
}