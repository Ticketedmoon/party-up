package com.partyup.gamesearch.game.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameResponse {

    private GameResult[] results;

    public static class GameResult {
        @JsonProperty(value = "guid")
        private String externalGameId;
        @JsonProperty(value = "name")
        private String gameTitle;
        @JsonProperty(value = "image")
        private GameCoverImage imageInfo;
        @JsonProperty(value = "description")
        private String gameDescription;

        @Setter
        @Getter
        private static class GameCoverImage {
            @JsonProperty(value = "original_url")
            private String originalUrl;
        }
    }
}
