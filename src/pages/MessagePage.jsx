import { useState, useEffect } from "react";
import api from "../api/api";

export default function MessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  // Buscar contatos de conversa já existentes
  const fetchContacts = async () => {
    try {
      const res = await api.get("/messages/contacts");
      setContacts(res.data);
      if (res.data.length > 0 && !selectedUser) {
        setSelectedUser(res.data[0]);
      }
    } catch (err) {
      console.error("Erro ao buscar contatos:", err);
    }
  };

  // Buscar mensagens trocadas com selectedUser
  const fetchMessages = async (user) => {
    if (!user) return;

    try {
      const [inboxRes, sentRes] = await Promise.all([
        api.get("/messages/inbox"),
        api.get("/messages/sent"),
      ]);

      const userId = user.id;

      const filteredMessages = [
        ...inboxRes.data.filter(m => m.senderId === userId),
        ...sentRes.data.filter(m => m.recipientId === userId)
      ];

      filteredMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      setMessages(filteredMessages);
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
    }
  };

  // Busca usuários conforme o query (para nova conversa)
  const searchUsers = async () => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }
    try {
      const res = await api.get(`/users/search?query=${encodeURIComponent(query)}`);
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  // No mount, buscar contatos
  useEffect(() => {
    fetchContacts();
  }, []);

  // Quando selectedUser muda, buscar mensagens
  useEffect(() => {
    fetchMessages(selectedUser);
  }, [selectedUser]);

  // Quando query muda, buscar usuários para nova conversa
  useEffect(() => {
    searchUsers();
  }, [query]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const res = await api.post("/messages", {
        recipientId: selectedUser.id,
        content: newMessage,
      });

      setMessages(prev => [...prev, res.data]);
      setNewMessage("");

      // Atualiza contatos para incluir novo contato, se for novo
      fetchContacts();
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Contatos e busca usuários */}
      <div className="w-1/3 border-r p-4 flex flex-col">
        <input
          type="text"
          placeholder="Buscar usuários pelo nome ou email"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="p-2 border rounded mb-4"
        />

        <div className="flex-grow overflow-y-auto mb-4">
          {query.trim() === "" ? (
            <>
              <h3 className="font-semibold mb-2">Contatos</h3>
              {contacts.length === 0 && <p>Nenhum contato encontrado.</p>}
              {contacts.map(user => (
                <div
                  key={user.id}
                  className={`p-2 cursor-pointer rounded hover:bg-blue-100 ${
                    selectedUser?.id === user.id ? "bg-blue-200" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <strong>{user.name}</strong>
                  <br />
                  <small className="text-gray-600">{user.email}</small>
                </div>
              ))}
            </>
          ) : (
            <>
              <h3 className="font-semibold mb-2">Buscar usuários</h3>
              {users.length === 0 && <p>Nenhum usuário encontrado.</p>}
              {users.map(user => (
                <div
                  key={user.id}
                  className={`p-2 cursor-pointer rounded hover:bg-blue-100 ${
                    selectedUser?.id === user.id ? "bg-blue-200" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <strong>{user.name}</strong>
                  <br />
                  <small className="text-gray-600">{user.email}</small>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col p-4">
        {!selectedUser ? (
          <p className="text-gray-600">Selecione um usuário para iniciar a conversa.</p>
        ) : (
          <>
            <div className="border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
              <p className="text-sm text-gray-600">{selectedUser.email}</p>
            </div>

            <div className="flex-grow overflow-y-auto mb-4 space-y-2">
              {messages.length === 0 && <p className="text-gray-600">Nenhuma mensagem ainda.</p>}
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-2 rounded max-w-xs ${
                    msg.senderId === selectedUser.id
                      ? "bg-gray-200 self-start"
                      : "bg-blue-600 text-white self-end"
                  }`}
                  style={{ alignSelf: msg.senderId === selectedUser.id ? "flex-start" : "flex-end" }}
                >
                  <p>{msg.content}</p>
                  <small className="text-xs text-gray-600">
                    {new Date(msg.createdAt).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite uma mensagem"
                className="flex-grow border p-2 rounded"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="bg-blue-600 text-white px-4 rounded"
                onClick={handleSendMessage}
              >
                Enviar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
