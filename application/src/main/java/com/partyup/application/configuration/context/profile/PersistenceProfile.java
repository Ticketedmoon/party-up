package com.partyup.application.configuration.context.profile;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

public interface PersistenceProfile {

    @Bean(name = "dataSource")
    DataSource createDataSource();
}
