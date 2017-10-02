package io.github.rodrik.chatserver.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.rodrik.chatserver.domain.ChatMessage;

import io.github.rodrik.chatserver.repository.ChatMessageRepository;
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
 * REST controller for managing ChatMessage.
 */
@RestController
@RequestMapping("/api")
public class ChatMessageResource {

    private final Logger log = LoggerFactory.getLogger(ChatMessageResource.class);

    private static final String ENTITY_NAME = "chatMessage";

    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageResource(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    /**
     * POST  /chat-messages : Create a new chatMessage.
     *
     * @param chatMessage the chatMessage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chatMessage, or with status 400 (Bad Request) if the chatMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chat-messages")
    @Timed
    public ResponseEntity<ChatMessage> createChatMessage(@RequestBody ChatMessage chatMessage) throws URISyntaxException {
        log.debug("REST request to save ChatMessage : {}", chatMessage);
        if (chatMessage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new chatMessage cannot already have an ID")).body(null);
        }
        ChatMessage result = chatMessageRepository.save(chatMessage);
        return ResponseEntity.created(new URI("/api/chat-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chat-messages : Updates an existing chatMessage.
     *
     * @param chatMessage the chatMessage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chatMessage,
     * or with status 400 (Bad Request) if the chatMessage is not valid,
     * or with status 500 (Internal Server Error) if the chatMessage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chat-messages")
    @Timed
    public ResponseEntity<ChatMessage> updateChatMessage(@RequestBody ChatMessage chatMessage) throws URISyntaxException {
        log.debug("REST request to update ChatMessage : {}", chatMessage);
        if (chatMessage.getId() == null) {
            return createChatMessage(chatMessage);
        }
        ChatMessage result = chatMessageRepository.save(chatMessage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chatMessage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chat-messages : get all the chatMessages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chatMessages in body
     */
    @GetMapping("/chat-messages")
    @Timed
    public List<ChatMessage> getAllChatMessages() {
        log.debug("REST request to get all ChatMessages");
        return chatMessageRepository.findAll();
        }

    /**
     * GET  /chat-messages/:id : get the "id" chatMessage.
     *
     * @param id the id of the chatMessage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chatMessage, or with status 404 (Not Found)
     */
    @GetMapping("/chat-messages/{id}")
    @Timed
    public ResponseEntity<ChatMessage> getChatMessage(@PathVariable Long id) {
        log.debug("REST request to get ChatMessage : {}", id);
        ChatMessage chatMessage = chatMessageRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chatMessage));
    }

    /**
     * DELETE  /chat-messages/:id : delete the "id" chatMessage.
     *
     * @param id the id of the chatMessage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chat-messages/{id}")
    @Timed
    public ResponseEntity<Void> deleteChatMessage(@PathVariable Long id) {
        log.debug("REST request to delete ChatMessage : {}", id);
        chatMessageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
