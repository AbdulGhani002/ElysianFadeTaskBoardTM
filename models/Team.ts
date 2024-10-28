import { Bson } from 'https://deno.land/x/mongo@v0.29.0/mod.ts';

interface ITeam {
  teamName: string;
  members: Bson.ObjectId[];
  permissions: string[];
}

class Team implements ITeam {
  teamName: string;
  members: Bson.ObjectId[];
  permissions: string[];

  constructor(teamName: string, members: Bson.ObjectId[], permissions: string[]) {
    this.teamName = teamName;
    this.members = members;
    this.permissions = permissions;
  }
  static async createTeam(teamData: ITeam) {
    const team = new Team(teamData.teamName, teamData.members, teamData.permissions);
    // Save team to database
    // await db.collection('teams').insertOne(team);
    return team;
  }

  static async updateTeam(teamId: Bson.ObjectId, teamData: Partial<ITeam>) {
    // Update team in database
    // await db.collection('teams').updateOne({ _id: teamId }, { $set: teamData });
    return teamData;
  }

  static async deleteTeam(teamId: Bson.ObjectId) {
    // Delete team from database
    // await db.collection('teams').deleteOne({ _id: teamId });
    return teamId;
  }
}

export default Team;
export { ITeam, Team };