package com.partyup.application.configuration.context;

import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

/**
 * We are BCrypt as a primary form of encryption and security for our passwords.
 * <p>
 * BCrypt, however, will internally generate a random salt instead.
 * This is important to understand because it means that each call will have a different result,
 * and so we need to only encode the password once.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class ApplicationSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final DataSource dataSource;
    private final ApplicationUserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    public JdbcUserDetailsManager jdbcUserDetailsManager() {
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager();
        jdbcUserDetailsManager.setDataSource(dataSource);
        return jdbcUserDetailsManager;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .headers()
                .xssProtection()
                .and()
                .frameOptions()
                .and().and()

                .authorizeRequests()
                .antMatchers("/login/").permitAll()
                .antMatchers("/api/**").hasAnyRole("BASIC", "STANDARD", "ADMIN")
                .antMatchers("/**").authenticated()
                .and()

                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/perform_login")
                .failureUrl("/login-failed")
                .defaultSuccessUrl("/")
                .permitAll()
                .and()

                .logout()
                .logoutSuccessUrl("/login")
                .logoutUrl("/logout")
                .deleteCookies("JSESSIONID")
                .and()

                .sessionManagement()
                .invalidSessionUrl("/login")
                .sessionFixation().newSession()
                .and()

                .exceptionHandling()
                .accessDeniedPage("/access-denied");
    }

}
