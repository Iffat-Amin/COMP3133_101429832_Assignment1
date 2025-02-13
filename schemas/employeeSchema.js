const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const Employee = require('../models/Employee');

// Define Employee Type
const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        department: { type: GraphQLString },
        salary: { type: GraphQLInt }
    })
});

// Define Employee Resolvers
const employeeResolvers = {
    // Get All Employees
    employees: {
        type: new GraphQLList(EmployeeType),
        async resolve() {
            return await Employee.find();
        }
    },

    // Get Employee by ID
    employee: {
        type: EmployeeType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(_, { id }) {
            return await Employee.findById(id);
        }
    },

    // Add Employee
    addEmployee: {
        type: EmployeeType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            position: { type: new GraphQLNonNull(GraphQLString) },
            department: { type: new GraphQLNonNull(GraphQLString) },
            salary: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_, args) {
            const employee = new Employee(args);
            return await employee.save();
        }
    },

    // Update Employee
    updateEmployee: {
        type: EmployeeType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            name: { type: GraphQLString },
            position: { type: GraphQLString },
            department: { type: GraphQLString },
            salary: { type: GraphQLInt }
        },
        async resolve(_, { id, name, position, department, salary }) {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                { name, position, department, salary },
                { new: true }
            );
            if (!updatedEmployee) {
                throw new Error('Employee not found');
            }
            return updatedEmployee;
        }
    },

    // Delete Employee
    deleteEmployee: {
        type: EmployeeType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(_, { id }) {
            const deletedEmployee = await Employee.findByIdAndDelete(id);
            if (!deletedEmployee) {
                throw new Error('Employee not found');
            }
            return deletedEmployee;
        }
    }
};

// Exporting the Employee Schema
module.exports = { EmployeeType, employeeResolvers };

