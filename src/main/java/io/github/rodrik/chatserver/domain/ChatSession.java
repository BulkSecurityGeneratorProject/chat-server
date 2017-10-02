package io.github.rodrik.chatserver.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ChatSession.
 */
@Entity
@Table(name = "chat_session")
public class ChatSession implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private ChatRoom chatRoom;

    @OneToMany(mappedBy = "chatSession")
    @JsonIgnore
    private Set<ChatMessage> messages = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ChatRoom getChatRoom() {
        return chatRoom;
    }

    public ChatSession chatRoom(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
        return this;
    }

    public void setChatRoom(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
    }

    public Set<ChatMessage> getMessages() {
        return messages;
    }

    public ChatSession messages(Set<ChatMessage> chatMessages) {
        this.messages = chatMessages;
        return this;
    }

    public ChatSession addMessages(ChatMessage chatMessage) {
        this.messages.add(chatMessage);
        chatMessage.setChatSession(this);
        return this;
    }

    public ChatSession removeMessages(ChatMessage chatMessage) {
        this.messages.remove(chatMessage);
        chatMessage.setChatSession(null);
        return this;
    }

    public void setMessages(Set<ChatMessage> chatMessages) {
        this.messages = chatMessages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChatSession chatSession = (ChatSession) o;
        if (chatSession.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatSession.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatSession{" +
            "id=" + getId() +
            "}";
    }
}
