import { Component, OnInit } from '@angular/core';
import { Task } from '../../modules/Task.Class';

@Component({
    selector: 'app-priority',
    templateUrl: './priority.component.html',
    styleUrls: ['./priority.component.css']
})
export class PriorityComponent implements OnInit {
    task: any;
    query: any;
    atomicArray: any;

    constructor() {
        // Create an instance of Task
        this.task = new Task();

        //Initialize the AtomicArray
        /*this.atomicArray = this.task.getArrayInstance(this.task);

        this.query = this.task.ref.root
            .child('tasks/all')
            .limitTolast(100);

        this.atomicArray.on(this.query);*/
        //this.populateDatabaseNode();
    }


    test(item: any): void {
        console.log(item);
    }

    ngOnInit() {

    }


    populateDatabaseNode(): void {
        const self = this;

        self.task.atomicPriority.last()
            .then(function(priority){
                self.task.create({
                    title: 'Task: ' + 1,
                    description: 'I am a cool task',
                    $priority: priority
                }).then(function(){
                    self.task.atomicPriority.last()
                        .then(function(priority){
                            self.task.create({
                                title: 'Task: ' + 2,
                                description: 'I am a cool task',
                                $priority: priority
                            }).then(function(){
                                self.task.atomicPriority.last()
                                    .then(function(priority){
                                        self.task.create({
                                            title: 'Task: ' + 3,
                                            description: 'I am a cool task',
                                            $priority: priority
                                        }).then(function(){
                                            self.task.atomicPriority.last()
                                                .then(function(priority){
                                                    self.task.create({
                                                        title: 'Task: ' + 4,
                                                        $priority: priority
                                                    }).then(function(){
                                                        self.task.atomicPriority.last()
                                                            .then(function(priority){
                                                                self.task.create({
                                                                    title: 'Task: ' + 5,
                                                                    description: 'I am a cool task',
                                                                    $priority: priority
                                                                }).then(function(){
                                                                    self.task.atomicPriority.last()
                                                                        .then(function(priority){
                                                                            self.task.create({
                                                                                title: 'Task: ' + 6,
                                                                                description: 'I am a cool task',
                                                                                $priority: priority
                                                                            }).then(function(){
                                                                                self.task.atomicPriority.last()
                                                                                    .then(function(priority){
                                                                                        self.task.create({
                                                                                            title: 'Task: ' + 7,
                                                                                            description: 'I am a cool task',
                                                                                            $priority: priority
                                                                                        }).then(function(){
                                                                                            self.task.atomicPriority.last()
                                                                                                .then(function(priority){
                                                                                                    self.task.create({
                                                                                                        title: 'Task: ' + 8,
                                                                                                        description: 'I am a cool task',
                                                                                                        $priority: priority
                                                                                                    }).then(function(){
                                                                                                        self.task.atomicPriority.last()
                                                                                                            .then(function(priority){
                                                                                                                self.task.create({
                                                                                                                    title: 'Task: ' + 9,
                                                                                                                    description: 'I am a cool task',
                                                                                                                    $priority: priority
                                                                                                                }).then(function(){
                                                                                                                    self.task.atomicPriority.last()
                                                                                                                        .then(function(priority){
                                                                                                                            self.task.create({
                                                                                                                                title: 'Task: ' + 10,
                                                                                                                                description: 'I am a cool task',
                                                                                                                                $priority: priority
                                                                                                                            }).then(function(){

                                                                                                                            });
                                                                                                                        });
                                                                                                                });
                                                                                                            });
                                                                                                    });
                                                                                                });
                                                                                        });
                                                                                    });
                                                                            });
                                                                        });
                                                                });
                                                            });
                                                    });
                                                });
                                        });
                                    });
                            });
                        });
                });
            });
    }

}
