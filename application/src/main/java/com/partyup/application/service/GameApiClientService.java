package com.partyup.application.service;

import com.partyup.application.domain.dto.game.GameInfoDTO;
import com.partyup.application.domain.dto.game.GameScreenshotInfoDTO;
import com.partyup.application.domain.entity.Game;
import com.partyup.application.exception.PartyUpException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class GameApiClientService {

    private static final String BASE_TWITCH_API_URL = "https://id.twitch.tv/oauth2/token";
    private static final String BASE_DATASTORE_URL = "https://api.igdb.com/v4/";
    private static final String BASE_GAME_DATASTORE_URL = BASE_DATASTORE_URL + "games";
    private static final String BASE_SCREENSHOT_DATASTORE_URL = BASE_DATASTORE_URL + "screenshots";
    private static final String GAME_DATASTORE_CLIENT_ID = "Client-ID";
    private static final String ALL_GAMES_DATASTORE_LOOKUP_QUERY = "fields name, summary, screenshots; where screenshots != null;";
    private static final String SINGLE_GAME_DATASTORE_LOOKUP_QUERY = "fields name, summary, screenshots; search \"%s\"; limit %d;";
    private static final String GAME_SCREENSHOT_DATASTORE_LOOKUP_QUERY = "fields url, game; where game = (%s);";
    private static final String FULL_TWITCH_API_URL = BASE_TWITCH_API_URL + "?client_id=%s&client_secret=%s&grant_type=%s";
    private static final String DEFAULT_GRANT_TYPE = "client_credentials";
    private static final String ACCESS_TOKEN = "access_token";

    @Value("${oauth.client.id}")
    private String oAuthClientId;

    @Value("${oauth.client.secret}")
    private String oAuthClientSecret;

    private final RestTemplate restTemplate;

    public List<Game> getGameList() {
        String accessToken = retrieveAccessToken();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.set(GAME_DATASTORE_CLIENT_ID, oAuthClientId);

        Map<Integer, Game> gameMap = getGameInformationFromDataStore(headers);
        GameScreenshotInfoDTO[] gameScreenshotInfoList = getScreenshotInformationFromDataStore(headers, gameMap);

        return Arrays.stream(gameScreenshotInfoList)
                .map(screenshotInfo -> {
                    Game game = gameMap.get(screenshotInfo.getGame());
                    game.setScreenshotUrl(screenshotInfo.getUrl());
                    return game;
                })
                .collect(Collectors.toList());
    }



    private GameScreenshotInfoDTO[] getScreenshotInformationFromDataStore(HttpHeaders headers, Map<Integer, Game> gameMap) {
        String gameIDs = gameMap.keySet().stream().map(Object::toString).collect(Collectors.joining(","));

        HttpEntity<String> request = new HttpEntity<>(String.format(GAME_SCREENSHOT_DATASTORE_LOOKUP_QUERY, gameIDs), headers);
        GameScreenshotInfoDTO[] gameScreenshotInfoList = restTemplate.postForEntity(BASE_SCREENSHOT_DATASTORE_URL, request, GameScreenshotInfoDTO[].class).getBody();
        if (gameScreenshotInfoList == null || gameScreenshotInfoList.length == 0) {
            throw new PartyUpException("Error finding game screenshot information in remote data store");
        }
        return gameScreenshotInfoList;
    }

    private Map<Integer, Game> getGameInformationFromDataStore(HttpHeaders headers) {
        HttpEntity<String> request = new HttpEntity<>(ALL_GAMES_DATASTORE_LOOKUP_QUERY, headers);
        GameInfoDTO[] gameInfoList = restTemplate.postForEntity(BASE_GAME_DATASTORE_URL, request, GameInfoDTO[].class).getBody();
        if (gameInfoList == null || gameInfoList.length == 0) {
            throw new PartyUpException("Error finding game information in remote data store");
        }
        Map<Integer, Game> gameMap = new HashMap<>();
        Arrays.stream(gameInfoList)
                .forEach(gameInfoDTO -> gameMap.put(gameInfoDTO.getId(), new Game(gameInfoDTO.getId(),
                        gameInfoDTO.getName(), gameInfoDTO.getScreenshots().get(0), "", gameInfoDTO.getSummary()))
                );
        return gameMap;
    }

    private String retrieveAccessToken() {
        String url = String.format(FULL_TWITCH_API_URL, oAuthClientId, oAuthClientSecret, DEFAULT_GRANT_TYPE);
        ResponseEntity<Object> response = restTemplate.postForEntity(url, null, Object.class);
        return ((LinkedHashMap<String, String>) response.getBody()).get(ACCESS_TOKEN);
    }

}
