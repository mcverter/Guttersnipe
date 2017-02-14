from server import db


class Kropotkin (db.Model):
  __tablename__ = 'kropotkin'
  id = db.Column(db.Integer, primary_key=True)
  paragraph = db.Column(db.String)

  def __init__(self, paragraph):
    self.paragraph = paragraph

  def __repr__(self):
    return '<Kropotkin %r>' % self.paragraph

