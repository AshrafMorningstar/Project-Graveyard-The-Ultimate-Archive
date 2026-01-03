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

import React from 'react'
import {
	Box,
	TextField,
	makeStyles
} from '@material-ui/core'

const useStyle = makeStyles(theme => ({
	component: {
		backgroundColor: '#F6F6F6',
		'& > *': {
			margin: theme.spacing(2)
		}

	}
}))

const BreadCrumb = ({
	onTextChange,
	onCountChange
}) => {
	const classes = useStyle();
	return ( <
		Box className = {
			classes.component
		} >
		<
		TextField label = "Search images"
		onChange = {
			(e) => onTextChange(e.target.value)
		}
		/>

		<
		TextField label = "Number of Images"
		onChange = {
			(e) => onCountChange(e.target.value)
		}
		/>             
		</Box>
	)
}

export default BreadCrumb
