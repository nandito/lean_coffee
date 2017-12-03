import { SemanticCOLORS } from 'semantic-ui-react'

export const TOPIC_STATE_NAMES = {
  OPEN: 'Open',
  CURRENT: 'Current',
  CLOSED: 'Closed',
}

export const TOPIC_STATE_ICONS = {
  OPEN: 'square outline',
  CURRENT: 'pointing right',
  CLOSED: 'checkmark box',
}

export const TOPIC_STATE_COLORS: {
  OPEN: SemanticCOLORS,
  CURRENT: SemanticCOLORS,
  CLOSED: SemanticCOLORS,
} = {
  OPEN: 'blue',
  CURRENT: 'green',
  CLOSED: 'orange',
}
