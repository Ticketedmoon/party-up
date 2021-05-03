package com.partyup.application.domain.dto.game;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameInfoDTO {
    private Integer id;
    private String name;
    private List<Integer> screenshots;
    private String summary;
}
