package vn.aliviet.order.rest;

import vn.aliviet.order.entity.Student;

import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by windluffy on 19/12/2015.
 */
@Path("/students")
@Produces({"application/xml", "application/json"})
public class JerseyRestService {
    private List<Student> students;

    public JerseyRestService() {
        students = new ArrayList<>();
        students.add(new Student("Phong", "Ta", 20, 1));
        students.add(new Student("Tan", "Ta", 20, 2));
        students.add(new Student("Trang", "Ta", 20, 3));
    }

    @GET
    public List<Student> getStudents() {
        return students;
    }

    @POST
    public String createStudent(Student std) {
        return std.toString();
    }

    @PUT
    public List<Student> editStudent(Student std) {
        for (Student s : students) {
            if (s.getId() == std.getId()) {
                s.setFirstName(std.getFirstName());
            }
        }
        return students;
    }
}
