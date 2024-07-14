import { Controller, Post } from '@nestjs/common';
import { BranchService } from '../services/branch.service';

@Controller()
export class BranchController {
    constructor(private readonly authService: BranchService) { }

}
