package com.partyup.application.domain.dto.game;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameInfoDTO {
    private Integer id;
    private String name;
    private List<GameScreenshotInfoDTO> screenshots;
    private String summary;

    @Setter
    @Getter
    private static class GameScreenshotInfoDTO {
        private Integer id;
        private Integer game;
        private String url;
        private Integer height;
        private Integer width;
    }

}
