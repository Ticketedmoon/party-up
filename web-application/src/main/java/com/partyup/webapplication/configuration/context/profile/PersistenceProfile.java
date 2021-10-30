package com.partyup.webapplication.configuration.context.profile;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;

public interface PersistenceProfile {
    @Bean(name = "dataSource")
    DataSource createDataSource();
}
