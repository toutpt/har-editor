import { registerService } from 'use-service';
import { $har } from './$har';

export default function init() {
    registerService($har);
}