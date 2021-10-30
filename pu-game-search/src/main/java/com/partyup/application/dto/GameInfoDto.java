package com.partyup.application.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameInfoDto {
    private Integer id;
    private String name;
    private List<GameScreenshotInfoDto> screenshots;
    private String summary;

    @Setter
    @Getter
    private static class GameScreenshotInfoDto {
        private Integer id;
        private Integer game;
        private String url;
        private Integer height;
        private Integer width;
    }

}
