package com.partyup.application.configuration.context.profile;

import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Slf4j
@Profile("development")
public class DevelopmentPersistenceProfile implements PersistenceProfile {

    @Value("${dev.app.datasource.driverClassName}")
    private String driverClassName;

    @Value("${dev.app.datasource.url}")
    private String dataSourceUrl;

    @Value("${dev.app.datasource.username}")
    private String dataSourceUsername;

    @Value("${dev.app.datasource.password}")
    private String dataSourcePassword;

    @Bean(name = "dataSource")
    @Override
    public DataSource createDataSource() {
        log.info("Data Source Creation for environment profile: [development]");
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(dataSourceUrl);
        dataSource.setUsername(dataSourceUsername);
        dataSource.setPassword(dataSourcePassword);
        return dataSource;
    }
}
