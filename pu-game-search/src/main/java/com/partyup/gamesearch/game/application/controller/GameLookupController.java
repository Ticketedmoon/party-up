package com.partyup.gamesearch.game.application.controller;

import com.partyup.gamesearch.game.application.dto.GameResponse;
import com.partyup.gamesearch.game.application.service.GameApiService;
import com.partyup.shared.exception.PartyUpException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/games")
public class GameLookupController {

    private static final String DEFAULT_GAME_LOOKUP_ERROR_MESSAGE = "Something went wrong when looking for game list information";

    private final GameApiService gameApiService;

    @GetMapping("/find/all/{limit}")
    public List<GameResponse.GameResult> findGamesWithLimit(@PathVariable int limit) {
        try {
            return gameApiService.getGameList(limit);
        } catch (PartyUpException e) {
            throw e;
        } catch (Exception e) {
            throw new PartyUpException(DEFAULT_GAME_LOOKUP_ERROR_MESSAGE, e);
        }
    }

    @GetMapping("/find/")
    public List<GameResponse.GameResult> findGamesByQuery(@RequestParam String query) {
        try {
            return gameApiService.findGamesByQuery(query);
        } catch (PartyUpException e) {
            throw e;
        } catch (Exception e) {
            throw new PartyUpException(DEFAULT_GAME_LOOKUP_ERROR_MESSAGE, e);
        }
    }

}
