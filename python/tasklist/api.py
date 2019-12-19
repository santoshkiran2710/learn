import tasklist.config as cfg
from flask import Flask, Blueprint
from flask_restplus import Resource, Api
import json
import atexit

app = Flask(__name__)
blueprint = Blueprint('api', __name__, url_prefix='/api')


api = Api(blueprint, doc='/doc', version='1.0', title='TaskList API', description='TaskList API')
name_space = api.namespace('member', description='Member APIs')


# @api.route("/member", methods=["GET", "POST"])


@name_space.route("")
class Member(Resource):

    def get(self):
        return self.post()

    @api.doc(responses={200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error'})
    def post(self):
        query_results = db.execute("SELECT * FROM Member")
        result_json = []
        for row in query_results:
            d = dict()
            d['id'] = row[1]
            d['name'] = row[0]
            result_json.append(d)

        return json.dumps(result_json, indent=4)


@name_space.route("/<string:name>")
class MemberSelect(Resource):

    @api.doc(responses={200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error'},
             params={'name': 'Specify the email associated with the member'})
    def get(self, name):

        query_results = db.execute("SELECT * FROM Member WHERE membername = '%s'" % name)

        result_json = []
        for row in query_results:
            d = dict()
            d['id'] = row[1]
            d['name'] = row[0]
            result_json.append(d)

        return json.dumps(result_json, indent=4)


@name_space.route("/del/<string:email>")
class MemberDelete(Resource):

    @api.doc(responses={200: 'OK', 400: 'Could not delete', 500: 'Mapping Key Error'},
             params={'email': 'Specify the email associated with the member'})
    def get(self, email):
        cfg.get_log().debug("Calling delete")
        db.execute("DELETE FROM member WHERE membername='"+email+"';")
        return {
            "status": "Person deleted",
            "name": email
        }


@name_space.route("/add/<string:email>")
class MemberAdd(Resource):

    @api.doc(responses={200: 'OK', 400: 'Could not insert', 500: 'Mapping Key Error'},
             params={'email': 'Specify the email associated with the member'})
    def get(self, email):
        cfg.get_log().debug("Calling add")
        db.execute("INSERT INTO member (memberid, membername) VALUES (nextval('member_id'), ""'"+email+"');")
        return {
            "status": "Person added",
            "name": email
        }


@name_space.route("/update/<string:old>/<string:new>")
class MemberUpdate(Resource):

    @api.doc(responses={200: 'OK', 400: 'Could not insert', 500: 'Mapping Key Error'},
             params={'old': 'Specify the old email associated with the member',
                     'new': 'Specify the new email associated with the member'})
    def get(self, old, new):
        cfg.get_log().debug("Calling update.." + old + "," + new)
        db.execute("UPDATE member set membername=""'"+new+"' WHERE membername=""'"+old+"';")
        return {
            "status": "Person update",
            "old": old,
            "new": new
        }


name_space = api.namespace('project', description='Project APIs')


@name_space.route("")
class Project(Resource):

    def get(self):
        return self.post()

    @api.doc(responses={200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error'})
    def post(self):
        query_results = db.execute("SELECT * FROM project")
        result_json = []
        for row in query_results:
            d = dict()
            d['id'] = row[0]
            d['name'] = row[1]
            result_json.append(d)

        return json.dumps(result_json, indent=4)


@name_space.route("/<string:name>")
class ProjectSelect(Resource):

    @api.doc(responses={200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error'},
             params={'name': 'Specify the project name'})
    def get(self, name):

        query_results = db.execute("SELECT * FROM Project WHERE description = '%s'" % name)

        result_json = []
        for row in query_results:
            d = dict()
            d['id'] = row[1]
            d['name'] = row[0]
            result_json.append(d)

        return json.dumps(result_json, indent=4)


@name_space.route("/del/<string:description>")
class ProjectDelete(Resource):

    @api.doc(responses={200: 'OK', 400: 'Could not delete', 500: 'Mapping Key Error'},
             params={'email': 'Specify the project'})
    def get(self, description):
        cfg.get_log().debug("Calling delete")
        db.execute("DELETE FROM Project WHERE description='"+description+"';")
        return {
            "status": "Project deleted",
            "description": description
        }


@name_space.route("/add/<string:description>")
class ProjectAdd(Resource):

    @api.doc(responses={200: 'OK', 400: 'Could not insert', 500: 'Mapping Key Error'},
             params={'description': 'Specify the Project'})
    def get(self, description):
        cfg.get_log().debug("Calling add")
        db.execute("INSERT INTO project (projectid, description) VALUES (nextval('project_id'), ""'"+description+"');")
        return {
            "status": "Project added",
            "description": description
        }


app.register_blueprint(blueprint)


if __name__ == '__main__':
    cfg.readconfig()
    db = cfg.DB()

    print("Registering cleanup")
    atexit.register(db.cleanup)
    app.run(debug=True)





