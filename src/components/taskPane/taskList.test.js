import { range } from '@laufire/utils/collection';
import { render } from '@testing-library/react';
import * as Task from './task.js';
import { React } from 'react';
import TaskList from './taskList.js';
import { rndBetween } from '@laufire/utils/random';

test('TaskList- lists the tasks', () => {
	const context = {
		state: {
			tasks: range(1, rndBetween()).map(Symbol),
		},
	};

	jest.spyOn(Task, 'default').mockReturnValue(<div role="Task"/>);

	const { getAllByRole } = render(TaskList(context));

	context.state.tasks.map((eachTask, index) => {
		expect(Task.default)
			.toHaveBeenCalledWith({ ...context, data: eachTask });
		expect(getAllByRole('Task')[index]).toBeInTheDocument();
	});
});
