package com.codewars.application.domain.entity;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class ChatHistoryDao {

    // A simple cache for temporarily storing chat data
    private final Cache<UUID, Map<String, String>> chatHistoryCache = CacheBuilder
            .newBuilder().maximumSize(20).expireAfterWrite(10, TimeUnit.MINUTES)
            .build();

    public void save(Map<String, String> chatObj) {
        this.chatHistoryCache.put(UUID.randomUUID(), chatObj);
    }

    public List<Map<String, String>> get() {
        return chatHistoryCache.asMap().values().stream()
                .sorted(Comparator.comparing(c -> Long.valueOf(c.get("timestamp"))))
                .collect(Collectors.toList());
    }

}
