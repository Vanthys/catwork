<?php

class Models_Post extends Models_Base
{
    public function findAll(): array
    {
        $statement = "SELECT id, author_id, liked_by, title, description, image, timestamp FROM post ORDER BY timestamp DESC;";

        $statement = $this->connection->query($statement);
        return array_map(function ($data) {
            return new Domains_Post($data);
        }, $statement->fetchAll(PDO::FETCH_ASSOC));
    }

    public function findLimit($offset = 0, $limit = 10): array
    {
        $query = "SELECT id, author_id, liked_by, title, description, image, timestamp FROM post ORDER BY timestamp ASC LIMIT :limit OFFSET :offset;";
        $statement = $this->connection->prepare($query);
        $statement->execute([':id' => $limit, ':offset' => $offset]);
        return array_map(function ($data) {
            return new Domains_Post($data);
        }, $statement->fetchAll(PDO::FETCH_ASSOC));
    }



    /**
     * @throws Exceptions_NotFound
     */
    public function findById($id): Domains_Post
    {
        $query = "SELECT id, author_id, liked_by, title, description, image, timestamp FROM post WHERE id = :id;";
        $statement = $this->connection->prepare($query);
        $statement->execute([':id' => $id]);
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            return new Domains_Post($data);
        } else {
            throw new Exceptions_NotFound();
        }
    }

    public function insert(Domains_Post $obj): Domains_Post
    {
        $query = "INSERT INTO post (author_id, title, description, image, timestamp, liked_by) VALUES (:author_id, :title, :description, :image, :timestamp, :liked_by);";
        $statement = $this->connection->prepare($query);
        $statement->execute([
            ":author_id" => $obj->author_id,
            ":title" => $obj->title,
            ":description" => $obj->description,
            ":image" => $obj->image,
            ":timestamp" => $obj->timestamp,
            ":liked_by" => "[]"
        ]);
        $lastId = $this->connection->lastInsertId();
        return $this->findById($lastId);
    }


    public function delete($id, $author_id)
    {
        $query = "DELETE FROM post WHERE id = :id and author_id = :author_id;";
        $statement = $this->connection->prepare($query);
        $statement->execute([":id" => $id, ":author_id" => $author_id]);
    }


    public function set_likes($id, $author_id)
    {
        $query = "SELECT liked_by FROM post WHERE id = :id;";
        $statement = $this->connection->prepare($query);
        $statement->execute([":id" => $id]);
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            $liked_by = (array)json_decode($data['liked_by']);

            if (!in_array($author_id, $liked_by)) {
                $liked_by[] = $author_id;
            }
            $query = "UPDATE post SET liked_by = :liked_by WHERE id = :id;";
            $statement = $this->connection->prepare($query);
            $statement->execute([
                ':liked_by' => json_encode($liked_by),
                ':id' => $id
            ]);
        } else {
            throw new Exceptions_NotFound();
        }
    }


    public function remove_likes($id, $author_id)
    {
        $query = "SELECT liked_by FROM post WHERE id = :id;";
        $statement = $this->connection->prepare($query);
        $statement->execute([":id" => $id]);
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            $liked_by = (array)json_decode($data['liked_by']);
            if (in_array($author_id, $liked_by)) {
                $liked_by = array_diff($liked_by, [$author_id]);
            }
            $query = "UPDATE post SET liked_by = :liked_by WHERE id = :id;";
            $statement = $this->connection->prepare($query);
            $statement->execute([
                ':liked_by' => json_encode($liked_by),
                ':id' => $id
            ]);
        } else {
            throw new Exceptions_NotFound();
        }
    }

}
