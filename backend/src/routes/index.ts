import { Router } from 'express';
import AstronautRouter from './Astronauts';

// Init router and path
const router: Router = Router();

// Add sub-routes
router.use('/astronauts', AstronautRouter)

// Export the base-router
export default router;
