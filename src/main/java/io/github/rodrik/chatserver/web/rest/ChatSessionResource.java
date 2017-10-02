package io.github.rodrik.chatserver.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.rodrik.chatserver.domain.ChatSession;

import io.github.rodrik.chatserver.repository.ChatSessionRepository;
import io.github.rodrik.chatserver.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ChatSession.
 */
@RestController
@RequestMapping("/api")
public class ChatSessionResource {

    private final Logger log = LoggerFactory.getLogger(ChatSessionResource.class);

    private static final String ENTITY_NAME = "chatSession";

    private final ChatSessionRepository chatSessionRepository;

    public ChatSessionResource(ChatSessionRepository chatSessionRepository) {
        this.chatSessionRepository = chatSessionRepository;
    }

    /**
     * POST  /chat-sessions : Create a new chatSession.
     *
     * @param chatSession the chatSession to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chatSession, or with status 400 (Bad Request) if the chatSession has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chat-sessions")
    @Timed
    public ResponseEntity<ChatSession> createChatSession(@RequestBody ChatSession chatSession) throws URISyntaxException {
        log.debug("REST request to save ChatSession : {}", chatSession);
        if (chatSession.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new chatSession cannot already have an ID")).body(null);
        }
        ChatSession result = chatSessionRepository.save(chatSession);
        return ResponseEntity.created(new URI("/api/chat-sessions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chat-sessions : Updates an existing chatSession.
     *
     * @param chatSession the chatSession to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chatSession,
     * or with status 400 (Bad Request) if the chatSession is not valid,
     * or with status 500 (Internal Server Error) if the chatSession couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chat-sessions")
    @Timed
    public ResponseEntity<ChatSession> updateChatSession(@RequestBody ChatSession chatSession) throws URISyntaxException {
        log.debug("REST request to update ChatSession : {}", chatSession);
        if (chatSession.getId() == null) {
            return createChatSession(chatSession);
        }
        ChatSession result = chatSessionRepository.save(chatSession);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chatSession.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chat-sessions : get all the chatSessions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chatSessions in body
     */
    @GetMapping("/chat-sessions")
    @Timed
    public List<ChatSession> getAllChatSessions() {
        log.debug("REST request to get all ChatSessions");
        return chatSessionRepository.findAll();
        }

    /**
     * GET  /chat-sessions/:id : get the "id" chatSession.
     *
     * @param id the id of the chatSession to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chatSession, or with status 404 (Not Found)
     */
    @GetMapping("/chat-sessions/{id}")
    @Timed
    public ResponseEntity<ChatSession> getChatSession(@PathVariable Long id) {
        log.debug("REST request to get ChatSession : {}", id);
        ChatSession chatSession = chatSessionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chatSession));
    }

    /**
     * DELETE  /chat-sessions/:id : delete the "id" chatSession.
     *
     * @param id the id of the chatSession to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chat-sessions/{id}")
    @Timed
    public ResponseEntity<Void> deleteChatSession(@PathVariable Long id) {
        log.debug("REST request to delete ChatSession : {}", id);
        chatSessionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
