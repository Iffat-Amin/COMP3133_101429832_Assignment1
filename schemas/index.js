const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { userResolvers } = require('./userSchema');
const { employeeResolvers } = require('./employeeSchema');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        employees: employeeResolvers.employees
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: userResolvers.register,
        login: userResolvers.login,
        addEmployee: employeeResolvers.addEmployee
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
