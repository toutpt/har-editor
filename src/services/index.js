import { registerService } from 'use-service';
import { $har } from './$har';
import { $edit } from './$edit';

export default function init() {
    registerService($har);
    registerService($edit);
}