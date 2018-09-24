
import bem from '../bem.js'

export default function create(sfc) {
	sfc.name = 'simple-' + sfc.name
	sfc.mixins = sfc.mixins || []
	sfc.mixins.push(bem)

	return sfc
}