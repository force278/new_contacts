
import sqlite3 as sql
import json


class Database:
	def __init__(self):
		connection = sql.connect("contacts.sqlite", check_same_thread=False)
		q = connection.cursor()
		q.execute('''
		CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
		Name VARHCAR(30),
		Avatar VARHCAR(100),
	    Number INTEGER,
	    GroupId INTEGER DEFAULT(0),
	    FOREIGN KEY(GroupId) REFERENCES groups(id)
		)''')
		q.execute('''
		CREATE TABLE IF NOT EXISTS groups (
		id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
		GroupName VARHCAR(10)
		)
		''')
		q.execute("SELECT COUNT(id) FROM groups")
		result = q.fetchone()
		if (result[0] == 0):
			q.execute("INSERT INTO groups (GroupName) VALUES ('%s')" % ("Семья"))
			q.execute("INSERT INTO groups (GroupName) VALUES ('%s')" % ("Друзья"))
			q.execute("INSERT INTO groups (GroupName) VALUES ('%s')" % ("Коллеги"))
		connection.commit()
		connection.close()
	async def get_users(self):
		connection = sql.connect("contacts.sqlite", check_same_thread=False)
		q = connection.cursor()
		q.execute("SELECT * FROM users")
		result = q.fetchall()
		connection.commit()
		connection.close()
		return result
	async def create_user(self, Name, Number, GroupId, Avatar=None):
		connection = sql.connect("contacts.sqlite", check_same_thread=False)
		q = connection.cursor()
		q.execute("INSERT INTO users (Name, Number, GroupId, Avatar) VALUES ('%s', '%s', '%s', '%s' )" % (Name, Number, GroupId, Avatar))
		connection.commit()
		connection.close()
	async def get_user(self, id):
		connection = sql.connect("contacts.sqlite", check_same_thread=False)
		q = connection.cursor()
		q.execute("SELECT * FROM users WHERE id = '%s'" % (id))
		result = q.fetchone()
		connection.commit()
		connection.close()
		return result
	async def update_user(self, id, Name=None, Number=None, GroupId=None, Avatar=None):
		connection = sql.connect("contacts.sqlite", check_same_thread=False)
		q = connection.cursor()
		q.execute("SELECT * FROM users WHERE id = '%s'" % (id))
		if Name != None:
			q.execute("UPDATE users SET Name = '%s' WHERE id = '%s'" % (Name, id))
		if Number != None:
			q.execute("UPDATE users SET Number = '%s' WHERE id = '%s'" % (Number, id))
		if GroupId != None:
			q.execute("UPDATE users SET GroupId = '%s' WHERE id = '%s'" % (GroupId, id))
		if Avatar != None:
			q.execute("UPDATE users SET Avatar = '%s' WHERE id = '%s'" % (Avatar, id))
		connection.commit()
		connection.close()
	async def delete_user(self, id): 
		connection = sql.connect("contacts.sqlite", check_same_thread=False)
		q = connection.cursor()
		q.execute("DELETE FROM users WHERE id = '%s'" % (id))
		connection.commit()
		connection.close()
	async def get_groups(self):
		connection = sql.connect("contacts.sqlite", check_same_thread=False)
		q = connection.cursor()
		q.execute("SELECT * FROM groups")
		result = q.fetchall()
		connection.commit()
		connection.close()
		return result

	