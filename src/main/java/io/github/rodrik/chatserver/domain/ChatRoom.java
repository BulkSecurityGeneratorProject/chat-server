package io.github.rodrik.chatserver.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ChatRoom.
 */
@Entity
@Table(name = "chat_room")
public class ChatRoom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    private Organization organization;

    @OneToMany(mappedBy = "chatRoom")
    @JsonIgnore
    private Set<ChatSession> sessions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ChatRoom name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public ChatRoom description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Organization getOrganization() {
        return organization;
    }

    public ChatRoom organization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Set<ChatSession> getSessions() {
        return sessions;
    }

    public ChatRoom sessions(Set<ChatSession> chatSessions) {
        this.sessions = chatSessions;
        return this;
    }

    public ChatRoom addSessions(ChatSession chatSession) {
        this.sessions.add(chatSession);
        chatSession.setChatRoom(this);
        return this;
    }

    public ChatRoom removeSessions(ChatSession chatSession) {
        this.sessions.remove(chatSession);
        chatSession.setChatRoom(null);
        return this;
    }

    public void setSessions(Set<ChatSession> chatSessions) {
        this.sessions = chatSessions;
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
        ChatRoom chatRoom = (ChatRoom) o;
        if (chatRoom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatRoom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatRoom{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
