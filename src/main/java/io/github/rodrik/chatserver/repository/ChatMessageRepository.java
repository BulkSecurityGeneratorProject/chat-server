package io.github.rodrik.chatserver.repository;

import io.github.rodrik.chatserver.domain.ChatMessage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ChatMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

}
