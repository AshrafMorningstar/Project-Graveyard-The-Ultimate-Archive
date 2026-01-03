/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import {
	Grid
} from '@material-ui/core';

import DisplayImages from './DisplayImages';

const Image = ({
	data
}) => {
	// console.log("data",data);
	return ( <
		Grid container > {
			data.map(image => ( <
				Grid xs = {
					3
				}
				item key = {
					image.id
				} > < DisplayImages image = {
					image
				}
				/>  </Grid >
			))

		} 
		</Grid>
	)
}

export default Image
